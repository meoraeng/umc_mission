export const signinResponseDTO = (member, prefer) => {
    const preferFood = [];
    for (let i = 0; i < prefer[0].length; i++) {
        preferFood.push(prefer[0][i].name);
    }
    return {"email": member[0].email, "name": member[0].name, "gender": member[0].gender, "preferCategory": preferFood, "birth": member[0].birth, "addr": member[0].addr, "phone": member[0].phone};
}