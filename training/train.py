# train.py
# Deepfake image detector and Hoax news identifier (otw son)
# Dataset: 140k Real and Fake Faces (Kaggle)
# Bunch of imported things that I lowkey barely have any idea what they do but they work so I salute

import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.applications import Xception
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from tensorflow.keras.optimizers import Adam

# GPU MEMORY CONFIG 
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print("GPU memory growth enabled")
    except RuntimeError as e:
        print(e)

# CONFIG SETTINGS (DONT GO BEYOND 8 IF YOU HAVE A SHIT COMPUTER, DONT GO BEYOND 16 IF YOU'RE NOT RUNNING IT ON BITCOIN MINERS)
IMG_SIZE = 224
BATCH_SIZE = 16
STAGE1_EPOCHS = 3       # frozen backbone
STAGE2_EPOCHS = 7       # fine-tune top layers
LR_STAGE1 = 1e-4
LR_STAGE2 = 1e-5        # smaller for fine-tuning
TRAIN_DIR = "data/train"
VAL_DIR = "data/test"
MODEL_SAVE_PATH = "models/deepfake_xception.h5"

# CHECK GPU
print("TensorFlow version:", tf.__version__)
print("GPU available:", tf.config.list_physical_devices('GPU'))

# DATA PIPELINE (Randomizer to train for imperfect pictures son)
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    zoom_range=0.1,
    fill_mode='nearest'
)

val_datagen = ImageDataGenerator(rescale=1./255)

train_gen = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='binary',
    shuffle=True
)

val_gen = val_datagen.flow_from_directory(
    VAL_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='binary',
    shuffle=False
)

print("Class indices:", train_gen.class_indices)

# BUILD MODEL (LOADS XCEPTION MODEL FROM IMAGENET)
base_model = Xception(
    weights='imagenet',
    include_top=False,
    input_shape=(IMG_SIZE, IMG_SIZE, 3)
)

# Start with frozen backbone (Trims weights and neuorons to reduce outliers and overfitting)
base_model.trainable = False

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.3)(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.2)(x)
output = Dense(1, activation='sigmoid')(x)

model = Model(inputs=base_model.input, outputs=output)

# CALLBACKS (saving best model results and recalling)
callbacks = [
    ModelCheckpoint(
        MODEL_SAVE_PATH,
        monitor='val_accuracy',
        save_best_only=True,
        verbose=1
    ),
    EarlyStopping(
        monitor='val_loss',
        patience=3,
        restore_best_weights=True,
        verbose=1
    )
]


# STAGE 1 — Train classifier head with frozen backbone (Training smaller detail lower parameter first to avoid generalizing cuz this shi lowk ass)

print("\n" + "=" * 60)
print("STAGE 1: Training classifier head (frozen backbone)")
print("=" * 60)

model.compile(
    optimizer=Adam(learning_rate=LR_STAGE1),
    loss='binary_crossentropy',
    metrics=['accuracy', tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
)

model.summary()

history1 = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=STAGE1_EPOCHS,
    callbacks=callbacks
)


# STAGE 2 — Fine-tune top layers of the backbone (unfreezing xception cnn parameters)

print("\n" + "=" * 60)
print("STAGE 2: Fine-tuning top layers of Xception")
print("=" * 60)

base_model.trainable = True

# Freeze all layers except the last 30 (high level features for easy high impact fine tuning)
for layer in base_model.layers[:-30]:
    layer.trainable = False

# Recompile with a much smaller learning rate (making sure the model learn to train with our new parameters)
model.compile(
    optimizer=Adam(learning_rate=LR_STAGE2),
    loss='binary_crossentropy',
    metrics=['accuracy', tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
)

history2 = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=STAGE2_EPOCHS,
    callbacks=callbacks
)

#  EVALUATE 
print("\nFinal evaluation on validation set:")
results = model.evaluate(val_gen)
for name, value in zip(model.metrics_names, results):
    print(f"{name}: {value:.4f}")

print(f"\nBest model saved to: {MODEL_SAVE_PATH}")