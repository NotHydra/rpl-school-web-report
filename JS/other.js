function get_random_number(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function check_checkbox_value(report_type){
    checkbox_value = document.querySelector(`#${report_type}_checkbox:checked`)

    if (checkbox_value == null){
        document.getElementById(`${report_type}_list_container`).style.display = "block";
    }

    if (checkbox_value != null){
        document.getElementById(`${report_type}_list_container`).style.display = "none";
    }

}

random_number_main_item_image = get_random_number(1, 5)

switch(random_number_main_item_image){
    case 1:
        image_in_main_item_image = "1.jpg"
        break
    
    case 2:
        image_in_main_item_image = "2.jpg"
        break

    case 3:
        image_in_main_item_image = "3.jpg"
        break

    case 4:
        image_in_main_item_image = "4.jpg"
        break
}

document.getElementsByClassName("main_item_image")[0].src = `../Image/Wallpaper/${image_in_main_item_image}`;
