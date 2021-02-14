export const calTime = (enterTime) => {
    enterTime = enterTime.split('-');
    enterTime = new Date(enterTime[0], enterTime[1]-1, enterTime[2]);

    let today = new Date();

    let v = enterTime.getTime();
    console.log(v - today.getTime()/1000/60/60/24);

    return (v - today.getTime()/1000/60/60/24);
}