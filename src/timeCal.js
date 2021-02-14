export const dateDiff = (enterTime) => {
    enterTime = enterTime.split('-');
    enterTime = new Date(enterTime[0], enterTime[1]-1, enterTime[2]);
    
    let today = new Date();
    let diff = enterTime.getDate() - today.getDate();

    return parseInt(diff/(1000*3600*24));
}