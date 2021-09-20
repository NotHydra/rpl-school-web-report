import excel2img
from files import *

def run_capture_image():
    for i in range(len(wb_mingguan_file)):
        excel2img.export_img(wb_mingguan_file[i], f"Excel/Mingguan/Image/{wb_mingguan_image_name[i]}.png", "Sheet1", None)


    for i in range(len(wb_bulanan_file)):
        excel2img.export_img(wb_bulanan_file[i], f"Excel/Bulanan/Image/{wb_bulanan_image_name[i]}.png", "Sheet1", None)


    excel2img.export_img("Excel/List Tugas Gabunggan.xlsx", "Excel/Image List Tugas Gabunggan.png", "Sheet1", f"Sheet1!{combined_task_range}")


run_capture_image()