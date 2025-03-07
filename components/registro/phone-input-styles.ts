export const phoneInputStyle = {
	".special-label": {
		display: "none",
	},
	".form-control": {
		width: "100%",
		height: "56px",
		borderRadius: "4px",
		fontSize: "16px",
		transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
		backgroundColor: "white",
		border: "1px solid rgba(0, 0, 0, 0.23)",
		"&:hover": {
			transform: "translateY(-1px)",
			boxShadow: "0 2px 8px rgba(47, 69, 13, 0.1)",
			borderColor: "#2f450d",
			borderWidth: "2px",
		},
		"&:focus": {
			transform: "translateY(-1px)",
			boxShadow: "0 4px 12px rgba(47, 69, 13, 0.15)",
			borderColor: "#2f450d",
			borderWidth: "2px",
			outline: "none",
		},
	},
	".flag-dropdown": {
		borderRadius: "4px 0 0 4px",
		borderColor: "rgba(0, 0, 0, 0.23)",
		backgroundColor: "transparent",
		transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.04)",
		},
		"&.open": {
			backgroundColor: "rgba(0, 0, 0, 0.04)",
		},
	},
	".selected-flag": {
		transition: "background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
		"&:hover, &:focus": {
			backgroundColor: "transparent",
		},
	},
	".country-list": {
		borderRadius: "4px",
		boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
		transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
		opacity: 0,
		transform: "translateY(-10px)",
		"&.country-list-show": {
			opacity: 1,
			transform: "translateY(0)",
		},
		".country": {
			transition: "background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
			"&:hover": {
				backgroundColor: "rgba(47, 69, 13, 0.08)",
			},
			"&.highlight": {
				backgroundColor: "rgba(47, 69, 13, 0.12)",
			},
		},
	},
}; 