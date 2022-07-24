const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/', (req, res) => {
	Comment.findAll({
		attributes: ['id', 'comment_text', 'user_id', 'post_id'],
		include: [
			{
				model: User,
				attributes: ['username'],
			},
		],
	})
		.then((dbCommentData) => res.json(dbCommentData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	// check the session
	if (req.session) {
		Comment.create({
			comment_text: req.body.comment_text,
			post_id: req.body.post_id,
			// use the id from the session
			user_id: req.session.user_id,
		})
			.then((dbCommentData) => res.json(dbCommentData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	}
});

router.get('/:id', (req, res) => {
	Comment.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ['id', 'comment_text', 'user_id', 'post_id'],
		include: [
			{
				model: User,
				attributes: ['username'],
			},
		],
	}).then((dbCommentData) => {
		if (!dbCommentData) {
			res.status(404).json({ message: 'No comment found with this id' });
			return;
		}
		res.json(dbCommentData);
	});
});

router.delete('/:id', (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: 'No comment found with this id' });
				return;
			}
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
