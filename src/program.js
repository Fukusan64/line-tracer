export default sensorState => {
    // line trace program body
    if (sensorState[0]) return {vr: 30, vl: 0};
    return {vr: 0, vl: 30};
};
