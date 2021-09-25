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