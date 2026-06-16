from PIL import Image

def make_white(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # item is (r, g, b, a)
        # We want to keep the alpha, but make the color white (255, 255, 255)
        new_data.append((255, 255, 255, item[3]))

    img.putdata(new_data)
    img.save(output_path)
    print(f"Saved white logo to {output_path}")

if __name__ == "__main__":
    make_white("images/Group.png", "images/logo-white.png")
