export default class AITask {
    constructor(taskData) {
        this.type = taskData.type;
        this.owner = taskData.owner;
        this.shipType = taskData.shipType;
        this.locations = taskData.locations || [];
        this.stationId = taskData.stationId;
    }
}
