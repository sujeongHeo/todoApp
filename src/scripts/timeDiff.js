export const dateDiff = (enterTime) => {
    console.log(enterTime, "입력한 완료 날짜 ");
    enterTime = enterTime.split('-');
    enterTime = new Date(enterTime[0], enterTime[1]-1, enterTime[2]);
    
    let today = new Date();
    console.log("enterTime.getDate() : ", enterTime.getDate());
    console.log("today.getDate() : ", today.getDate());
    let diff = enterTime.getDate() - today.getDate();
    
    return parseInt(diff);
}