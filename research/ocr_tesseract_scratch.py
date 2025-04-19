import pytesseract
from PIL import Image
import matplotlib.pyplot as plt

# placeholder image path (would be claim pdf scan)
image_path = "sample_claim.png"

try:
    img = Image.open(image_path)
    plt.imshow(img)
    plt.axis('off')
    plt.title("OCR Source Image")
    plt.show()

    # convert image to string
    extracted_text = pytesseract.image_to_string(img)
    print("ocr extracted text:\n")
    print(extracted_text)

    # # optionally: filter out lines
    # lines = [line for line in extracted_text.split('\n') if line.strip() and not line.strip().isdigit()]
    # print("filtered text:", lines)

except FileNotFoundError:
    print("could not load sample_claim.png - skipping visual and ocr")
