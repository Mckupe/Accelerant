import { makeAutoObservable } from 'mobx';
import { postStore } from './postStore';

class commentDataStore {
	commentArray: Array<Coment> = this.resetCommentArray();
	dbCommentArray: Array<Coment> = [];

	constructor() {
		makeAutoObservable(this);
	}

	resetCommentArray() {
		return [];
	}

	changeCommentArray(comments: Array<Coment>) {
		this.commentArray = comments;
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
