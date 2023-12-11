let styles = {
	body: {
		background: '#fafafa',
		color: '#121212',
		'font-size': '15px',
		'line-height': 1.5,
	},
	p: {
		color: '#ffffff',
		'font-size': '15px',
		'line-height': 1.5
	},
	li: {
		color: '#ffffff',
		'font-size': '15px',
		'line-height': 1.5
	},
	h1: {
		color: '#ffffff'
	}
};

export default function(theme) {
	styles.body = {
		background: theme.bg,
		color: theme.fg,
		'font-family': theme.font,
		'font-size': theme.size,
		'line-height': theme.height
	};
	styles.p = {
		color: theme.fg,
		'font-family': theme.font,
		'font-size': theme.size,
		'line-height': theme.height
	};
	styles.li = {
		color: theme.fg,
		'font-family': theme.font,
		'font-size': theme.size,
		'line-height': theme.height
	};
	styles.h1.color = theme.fg;
	return styles;
}