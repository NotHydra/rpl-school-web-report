import excel2img
from files import *

for i in range(len(wb_mingguan_file)):
    excel2img.export_img(wb_mingguan_file[i], f"Excel/Mingguan/Image/{wb_mingguan_image_name[i]}.png", "Sheet1", None)


for i in range(len(wb_bulanan_file)):
    excel2img.export_img(wb_bulanan_file[i], f"Excel/Bulanan/Image/{wb_bulanan_image_name[i]}.png", "Sheet1", None)