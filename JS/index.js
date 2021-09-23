function get_random_number(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function check_checkbox_value(report_type){
    checkbox_value = document.querySelector(`#${report_type}_checkbox:checked`)

    if (checkbox_value == null){
        document.getElementById(`${report_type}_list_container`).style.display = "block";
        document.getElementById(`up_angle_to_down_${report_type}`).style.transform = "rotate(180deg)";
    }

    if (checkbox_value != null){
        document.getElementById(`${report_type}_list_container`).style.display = "none";
        document.getElementById(`up_angle_to_down_${report_type}`).style.transform = "rotate(0deg)";
    }

}

random_number_main_item_image = get_random_number(1, 141)

if (random_number_main_item_image > 0 && random_number_main_item_image <= 20){
    image_in_main_item_image = "1.jpg"
}

else if (random_number_main_item_image > 20 && random_number_main_item_image <= 40){
    image_in_main_item_image = "2.jpg"
}

else if (random_number_main_item_image > 40 && random_number_main_item_image <= 60){
    image_in_main_item_image = "3.jpg"
}

else if (random_number_main_item_image > 60 && random_number_main_item_image <= 80){
    image_in_main_item_image = "4.jpg"
}

else if (random_number_main_item_image > 80 && random_number_main_item_image <= 100){
    image_in_main_item_image = "5.jpg"
}

else if (random_number_main_item_image > 100 && random_number_main_item_image <= 120){
    image_in_main_item_image = "6.jpg"
}

else if (random_number_main_item_image > 120 && random_number_main_item_image <= 139){
    image_in_main_item_image = "7.jpg"
}

else if (random_number_main_item_image == 140){
    image_in_main_item_image = "8.jpg"
}

document.getElementsByClassName("main_item_image")[0].src = `Image/Wallpaper/${image_in_main_item_image}`;
