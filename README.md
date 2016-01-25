gulp-react
gulp-sourcemap
gulp-rename

2个component间通信
1.使用事件
3.mixin
3.如果是父子
	父: <CommentForm onCommentSubmit={this.handleCommentSubmit} />
	子：this.props.onCommentSubmit({author: author, text: text})