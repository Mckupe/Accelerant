declare type ObjectProject = {
	id: number;
	name: string;
	nameCreator: string;
	arraySoc: Array<string>;
	favorit: boolean;
};

declare type ObjectPattern = {
	id: number;
	name: string;
	nameText: string;
	text: string;
	userid: number;
}

declare type Post = {
	id: number;
	time: string;
	themeId: Array<number>;
	socnetId: Array<number>;
	nameCreator: string;
	published: boolean;
};

declare type Posts = {
	img: Array<string>;
	post: Post;
	text: string;
};

declare type Socnet = {
	id: number;
	socnet: string;
	link: string;
	token: string;
};

declare type Theme = {
	id: number;
	theme: string;
	color: string;
};

declare type Coment = {
	text: string;
	postid: number;
	nameCreator: string;
	createdAt: string;
};
