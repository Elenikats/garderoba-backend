const colorConverter = (req,res,next)=>{

    const hexColors = [
        { black: "#000"},
        { white: "#fff"},
        { blue:"#1C86EE"},
    ]  
    
    
    
    const color = req.query.color

    if(color){
        const mapColors = hexColors.find(item => console.log(Object.keys(item) === color))
    }

    return;



    
}

export default colorConverter


// { id: 1, style: "casual", isChecked: false },
//     { id: 2, style: "formal", isChecked: false },
//     { id: 3, style: "work", isChecked: false },
//     { id: 4, style: "home", isChecked: false },
//     { id: 5, color: "black", hex: "#000", isChecked: false },
//     { id: 6, color: "white", hex: "#fff", isChecked: false },
//     { id: 7, color: "blue", hex: "#1C86EE", isChecked: false },
//     { id: 8, color: "red", hex: "#EE3B3B", isChecked: false },
//     { id: 9, color: "pink", hex: "#FF82AB", isChecked: false },
//     { id: 10, color: "beige", hex: "#E1C699", isChecked: false },
//     { id: 11, color: "lightgreen", hex: "#C1FFC1", isChecked: false },
//     { id: 12, color: "green", hex: "#2E8B57", isChecked: false },
//     { id: 13, color: "gray", hex: "#7A8B8B", isChecked: false },
//     { id: 14, color: "gold", hex: "#FFB90F", isChecked: false },
//     { id: 15, color: "brown", hex: "#8B4500", isChecked: false },