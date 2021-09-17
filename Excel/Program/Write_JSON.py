import os
import time
import json
from files import wb_mingguan_file, wb_bulanan_file

def write_json_file():
    path_weekly = wb_mingguan_file
    path_monthly = wb_bulanan_file
    path_combined = "Excel\List Tugas Gabunggan.xlsx"

    weekly_last_modified = []
    for i in range(len(path_weekly)):
        temp_weekly_last_modified = os.path.getmtime(path_weekly[i]) # Get The Last Modified Value
        temp_weekly_last_modified = time.ctime(temp_weekly_last_modified) # Translate The Value
        temp_weekly_last_modified = temp_weekly_last_modified.split(" ")
        temp_weekly_last_modified = f"{temp_weekly_last_modified[2]} {temp_weekly_last_modified[1]} {temp_weekly_last_modified[4]} {temp_weekly_last_modified[3]}"

        weekly_last_modified.append(temp_weekly_last_modified)


    monthly_last_modified = []
    for i in range(len(path_monthly)):
        temp_monthly_last_modified = os.path.getmtime(path_monthly[i]) # Get The Last Modified Value
        temp_monthly_last_modified = time.ctime(temp_monthly_last_modified) # Translate The Value
        temp_monthly_last_modified = temp_monthly_last_modified.split(" ")
        temp_monthly_last_modified = f"{temp_monthly_last_modified[2]} {temp_monthly_last_modified[1]} {temp_monthly_last_modified[4]} {temp_monthly_last_modified[3]}"

        monthly_last_modified.append(temp_monthly_last_modified)


    temp_combined_last_modified = os.path.getmtime(path_combined) # Get The Last Modified Value
    temp_combined_last_modified = time.ctime(temp_combined_last_modified) # Translate The Value
    temp_combined_last_modified = temp_combined_last_modified.split(" ")
    temp_combined_last_modified = f"{temp_combined_last_modified[2]} {temp_combined_last_modified[1]} {temp_combined_last_modified[4]} {temp_combined_last_modified[3]}"
    combined_last_modified = temp_combined_last_modified

    json_value_to_write = {
        "weekly_last_modified": weekly_last_modified,
        "monthly_last_modified": monthly_last_modified,
        "combined_last_modified": combined_last_modified
    }

    json_value_to_write = json.dumps(json_value_to_write)
    json_file = open("Excel/List Last Time Modified.json", "w")
    json_file.write(json_value_to_write)
    json_file.close()

write_json_file()