# detector.py
# Loads the trained deepfake model and exposes a predict() helper.

import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import math
from datetime import datetime, timezone
# Resolve the model path relative to this file.
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(SCRIPT_DIR)

# Model configuration
MODEL_PATH = "./model/deepfake/deepfake_xception.h5"
IMG_SIZE = 224

_model = None

def _get_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model not found at {MODEL_PATH}. Run train.py first."
            )
        print(f"Loading model from {MODEL_PATH}...")
        _model = load_model(MODEL_PATH)
        print("Model loaded.")
    return _model


# PUBLIC FUNCTION
def predict(img_path, use_tta=True):
    """
    Predict whether an image is REAL or FAKE.

    Args:
        img_path: path to an image file
        use_tta: if True, average predictions over 4 flipped versions (default True)

    Returns:
        dict with keys: label, confidence, raw_score, tta_enabled
    """
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"Image not found: {img_path}")

    model = _get_model()

    img = image.load_img(img_path, target_size=(IMG_SIZE, IMG_SIZE))
    arr = image.img_to_array(img) / 255.0

    # Test-time augmentation: evaluate the original image and its horizontal flip.
    if use_tta:
        variants = [
            arr,
            np.fliplr(arr),
        ]
        batch = np.stack(variants, axis=0)
        scores = model.predict(batch, verbose=0).flatten()
        score = float(np.mean(scores))
    else:
        arr = np.expand_dims(arr, axis=0)
        score = float(model.predict(arr, verbose=0)[0][0])


    # Training labels: {'deepfake': 0, 'real': 1}
    label = "REAL" if score > 0.5 else "DEEPFAKE"
    confidence = score if score > 0.5 else 1 - score

    return {
        "prediction": label,
        "confidence": math.floor(float(confidence*100)),
        "raw_score": score,
        "tta_enabled": use_tta,          # new 10/15
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python detector.py <path_to_image> [--no-tta]")
        sys.exit(1)

    use_tta = "--no-tta" not in sys.argv   # new 10/15
    result = predict(sys.argv[1], use_tta=use_tta)
    print(f"Prediction: {result['prediction']}")
    print(f"Confidence: {result['confidence'] * 100:.2f}%")
    print(f"Raw score:  {result['raw_score']:.4f}")
    print(f"TTA:        {'enabled' if use_tta else 'disabled'}")   # new 10/15