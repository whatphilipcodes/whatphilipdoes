type VideoProps = {
	src: string;
};

const Video = ({ src }: VideoProps) => {
	return (
		<video preload="auto" autoPlay loop muted playsInline>
			<source src={src} type="video/mp4" />
		</video>
	);
};

export default Video;
