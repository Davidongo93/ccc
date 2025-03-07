import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: boolean;
	helperText?: string;
}

export const StyledInput = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, helperText, className = '', id, ...props }, ref) => {
		const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
		
		return (
			<div className="w-full">
				{label && (
					<label 
						htmlFor={inputId}
						className="mb-1 block text-sm font-medium text-gray-700 transition-colors duration-200"
					>
						{label}
					</label>
				)}
				<input
					id={inputId}
					ref={ref}
					className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all duration-200 
						hover:translate-y-[-1px] hover:border-[#2f450d] hover:border-2 hover:shadow-[0_2px_8px_rgba(47,69,13,0.1)]
						focus:translate-y-[-1px] focus:border-[#2f450d] focus:border-2 focus:shadow-[0_4px_12px_rgba(47,69,13,0.15)] focus:outline-none
						${error ? 'border-red-500' : ''} 
						${className}`}
					{...props}
				/>
				{helperText && (
					<p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
						{helperText}
					</p>
				)}
			</div>
		);
	}
);

StyledInput.displayName = 'StyledInput'; 