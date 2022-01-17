// constructeur d'évènement lors de la création d'un nouveau post 

export default class MediaAddEvent extends CustomEvent {
    static event = "mediaAdd";
    constructor(data) {
        super(MediaAddEvent.event, {detail:data});
    }
};