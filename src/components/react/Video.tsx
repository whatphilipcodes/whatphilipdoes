type VideoProps = {
	src: string;
} & React.HTMLAttributes<HTMLVideoElement>;

const Video = ({ src, ...htmlAttributes }: VideoProps) => {
	return (
		<video preload="auto" autoPlay loop muted playsInline {...htmlAttributes}>
			<source src={src} type="video/mp4" />
		</video>
	);
};

export default Video;
