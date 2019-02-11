
$(document).ready(function () 
{

    let data = [1, 2, 3, 8, 0, 4, 7, 6, 5];
    let data1 = [1, 2, 3, 8, 0, 4, 7, 6, 5];
    let position = [1, 1, 1, 1, 0, 1, 1, 1, 1];
    let shuttle_count = 100;
    let is_move = 0;
    let is_moving = 0;
    let key = 0;
    let interval;

    function move_tile(target, direction) 
    {
        let left = target.css("left").replace("px", "");
        let top = target.css("top").replace("px", "");
        switch (direction) 
        {
            case "left":
                left = left - 110;
                target.animate({ left: left + "px" }, 10);
                break;
            case "right":
                left = Number(left) + Number(110);
                target.animate({ left: left + "px" }, 10);
                break;
            case "top":
                top = Number(top) - Number(110);
                target.animate({ top: top + "px" }, 10);
                break;
            case "bottom":
                top = Number(top) + Number(110);
                target.animate({ top: top + "px" }, 10);
                break;
            default: break;
        }
    }

    $(".content div").click(function (e) 
    {
        is_move = 0;
        let selected_id = Number($(this).attr("id"));
        if (selected_id - 1 > -1 && selected_id % 3)
            if (position[selected_id - 1] == 0) 
            {
                move_tile($(this), 'left');
                position[selected_id] = 0;
                position[selected_id - 1] = 1;
                data[selected_id] = 0;
                data[selected_id - 1] = Number($(this).children().text());
                $(this).attr("id", selected_id - 1);
                is_move = 1;
                if (check() && !is_moving) $('#success_modal').modal("show");
                return true;
            }
        if (selected_id + 1 < 9 && selected_id % 3 != 2)
            if (position[selected_id + 1] == 0) 
            {
                move_tile($(this), 'right');
                position[selected_id] = 0;
                position[selected_id + 1] = 1;
                data[selected_id] = 0;
                data[selected_id + 1] = Number($(this).children().text());
                $(this).attr("id", selected_id + 1);
                is_move = 1;
                if (check() && !is_moving) $('#success_modal').modal("show");
                return true;
            }
        if (selected_id - 3 > -1)
            if (position[selected_id - 3] == 0) 
            {
                move_tile($(this), 'top');
                position[selected_id] = 0;
                position[selected_id - 3] = 1;
                data[selected_id] = 0;
                data[selected_id - 3] = Number($(this).children().text());
                $(this).attr("id", selected_id - 3);
                is_move = 1;
                if (check() && !is_moving) $('#success_modal').modal("show");
                return true;
            }
        if (selected_id + 3 < 9)
            if (position[selected_id + 3] == 0) 
            {
                move_tile($(this), 'bottom');
                position[selected_id] = 0;
                position[selected_id + 3] = 1;
                data[selected_id] = 0;
                data[selected_id + 3] = Number($(this).children().text());
                $(this).attr("id", selected_id + 3);
                is_move = 1;
                if (check() && !is_moving) $('#success_modal').modal("show");
                return true;
            }
        return false;
    });

    function shuttle() 
    {
        for (; ;) 
        {
            let random_number = Math.floor((Math.random() * 10));
            $(".tile_" + random_number).click();
            if (is_move) 
            {
                key++;
                break;
            }
        }
        if (key == shuttle_count) 
        {
            is_moving = 0;
            clearInterval(interval);
            $("#make_shuttle").removeAttr("disabled");
        }
    }

    $("#make_shuttle").click(function () 
    {
        key = 0;
        is_moving = 1;
        $(this).attr("disabled", "disabled");
        interval = setInterval(shuttle, 40);
    });

    function check() 
    {
        let count = 0;
        for (let i = 1; i < 9; i++)
            if (data[i - 1] == data1[i - 1]) count++;
        if (count == 8) return true;
        else return false;
    }

});