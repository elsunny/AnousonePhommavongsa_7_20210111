// Constructeur pour un évènement lors de la création d'un commentaire

export default class CommentAddEvent extends CustomEvent {
    static event = "commentAdd";
    constructor(data) {
        super(CommentAddEvent.event, {detail:data});
    }
};