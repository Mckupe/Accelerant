import { makeAutoObservable } from 'mobx';
import { postStore } from './postStore';

class commentDataStore {
	commentArray: Array<Coment> = [];
	dbCommentArray: Array<Coment> = [];

	constructor() {
		makeAutoObservable(this);
	}

	addComment(comment: Coment) {
		this.commentArray.push(comment);
	}

	addDbComment(comments: Array<Coment>) {
		this.dbCommentArray = comments;
	}

	get postComment() {
		return this.commentArray.filter(comment => {
			return comment.postid === postStore.activePostId;
		});
	}
}

export const commentStore = new commentDataStore();
