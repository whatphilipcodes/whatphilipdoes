type VideoProps = {
	src: string;
} & React.HTMLAttributes<HTMLVideoElement>;

const Video = ({ src, ...rest }: VideoProps) => {
	return (
		<video preload="auto" autoPlay loop muted playsInline {...rest}>
			<source src={src} type="video/mp4" />
		</video>
	);
};

export default Video;
