export default class MediaAddEvent extends CustomEvent {
    static event = "mediaAdd";
    constructor(data) {
        super(MediaAddEvent.event, {detail:data});
    }
};