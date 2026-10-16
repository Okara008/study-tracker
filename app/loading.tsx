export default function Loading() {
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 mt-17"
			role="status"
			aria-label="Loading"
		>
			<div className="h-14 w-14 animate-spin rounded-full border-4 border-purple-100 border-t-purple-700" />
		</div>
	);
}
