from PIL import Image
import glob
import shutil
import os


def convert_to_webp(scale=0.5, quality=50, thumbnail: "(x, y)" = None):
    """Convert image to WebP.
    Args:
        source (pathlib.Path): Path to source image

    Returns:
        pathlib.Path: path to new image
    """
    os.makedirs("orignal", exist_ok=True)
    for x in glob.glob("*.*"):
        if "webp" in x:
            continue
        try:
            basename = x.split(".")[0]
            img = Image.open(x)
            width, height = img.size
            if thumbnail:
                img.thumbnail(
                    thumbnail)
                # print("teacer", thumbnail)
            else:
                img = img.resize(
                    (int(width * scale), int(height * scale)), Image.ANTIALIAS)
            newname = basename + ".webp"
            img.save(newname, format="webp", quality=quality)  # Convert image to webp

            # shutil.move(newname, "./webp/" + newname)
            shutil.move(x, f"./orignal/{x}")
            print("PROCESSED :", x)
        except Exception as e:
            print(e)
            raise e


if __name__ == "__main__":
    # convert_to_webp(scale=1, thumbnail=(512, 512), quality=100)
    convert_to_webp(scale=0.75, quality=50)
