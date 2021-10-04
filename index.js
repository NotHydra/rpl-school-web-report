const list_of_container = ["image_banner", "home", "report_assignment", "class_code", "changelog", "contributor"];
const list_of_variable_for_if_in_image_banner  = ["home",            "class_code", "changelog", "contributor"]
const list_of_text_in_image_banner_inner_value = ["Website Laporan", "Class Code", "Changelog", "Contributor"]
const first_random_number_range =  [0,  20, 40, 60, 80,  100, 120]
const second_random_number_range = [20, 40, 60, 80, 100, 120, 139]

function get_random_number(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function check_checkbox_value(report_type){
    checkbox_value = document.querySelector(`#${report_type}_checkbox:checked`)
    
    if (checkbox_value == null){
        try{
            document.getElementById(`${report_type}_list_container`).style.display = "block";
        }

        catch(err){
            {}
        }
        
        try{
            document.getElementById(`${report_type}_container`).style.right = "0px"
            document.getElementById(`${report_type}_invinsible_label`).style.display = "block";
        }
        
        catch(err){
            {}
        }

        try{
            document.getElementById(`up_angle_to_down_${report_type}`).style.transform = "rotate(180deg)";
        }

        catch(err){
            {}
        }
        
    }

    if (checkbox_value != null){
        try{
            document.getElementById(`${report_type}_list_container`).style.display = "none";
        }

        catch(err){
            {}
        }

        try{
            document.getElementById(`${report_type}_container`).style.right = "-275px"
            document.getElementById(`${report_type}_invinsible_label`).style.display = "none";
        }
        
        catch(err){
            {}
        }

        try{
            document.getElementById(`up_angle_to_down_${report_type}`).style.transform = "rotate(0deg)";
        }

        catch(err){
            {}
        }
        
    }

}


function disable_container(){
    for(let i = 0; i < list_of_container.length; i++){
        try{
            document.getElementById(`container_${list_of_container[i]}`).style.display = "none";
        }

        catch(err){
            {}
        }

    }

}

function check_checkbox_value_container(container_type){
    checkbox_value = document.querySelector(`#${container_type}_checkbox:checked`)
    
    disable_container()
    
    for(let i = 0; i < list_of_container.length; i++){
        if (container_type == list_of_container[i]){
            try{
                document.getElementById(`container_image_banner`).style.display = "block";
                document.getElementById(`container_${list_of_container[i]}`).style.display = "block";
            }
    
            catch(err){
                {}
            }
            
        }

    }

    for(let i = 0; i < list_of_variable_for_if_in_image_banner.length; i++){
        if (container_type == list_of_variable_for_if_in_image_banner[i]){
            document.getElementById("main_item_class_header").innerHTML = list_of_text_in_image_banner_inner_value[i];
            document.getElementById("main_item_class_name").innerHTML = "";
        }

        if (container_type == "home"){
            document.getElementById("main_item_class_name").innerHTML = "XI-RPL";
        }
        
    }

}


function report_assignment_image(report_type, report_number){
    disable_container()

    if (report_type == "weekly"){
        document.getElementById("item_image").src = `Excel/Mingguan/Image/Image List Tugas Minggu Ke-${report_number}.png`;
    }

    if (report_type == "monthly"){
        document.getElementById("item_image").src = `Excel/Bulanan/Image/Image List Tugas Bulan Ke-${report_number}.png`;
    }

    if (report_type == "combined"){
        document.getElementById("item_image").src = `Excel/Image List Tugas Gabunggan.png`;
    }

    document.getElementById("container_report_assignment").style.display = "block";
    
}


let random_number_main_item_image = get_random_number(1, 141)
let image_in_main_item_image = ""

for(let i = 0;i < (first_random_number_range.length); ++i){
    if (random_number_main_item_image > first_random_number_range[i] && random_number_main_item_image <= second_random_number_range[i]){
        image_in_main_item_image = parseInt(i + 1)
        break
    }

    if (random_number_main_item_image == 140){
        image_in_main_item_image = "8"
        break
    }

}


document.getElementsByClassName("main_item_image")[0].src = `Image/Wallpaper/${image_in_main_item_image}.jpg`;

