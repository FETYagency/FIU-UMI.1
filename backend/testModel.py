from detector import predict
image_path = "./stats/deepFakeTestImages/man1-swap-2.jpeg"
result = predict(image_path)
print(result)