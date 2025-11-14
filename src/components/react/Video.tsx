type VideoProps = {
	src: string;
};

const Video = ({ src }: VideoProps) => {
	return (
		<video preload="auto" autoPlay loop muted>
			<source src={src} type="video/mp4" />
		</video>
	);
};

export default Video;
