// constructeur évènement lors de la suppression d'un commentaire

export default class CommentDeleteEvent extends CustomEvent {
    static event = "commentDelete";
    constructor(data) {
        super(CommentDeleteEvent.event, {detail:data});
    }
};