type VideoPlayerProps = {
	src: string;
} & React.HTMLAttributes<HTMLVideoElement>;

const VideoPlayer = ({ src, ...htmlAttributes }: VideoPlayerProps) => {
	return (
		<video preload='auto' autoPlay loop muted playsInline {...htmlAttributes}>
			<source src={src} type='video/mp4' />
		</video>
	);
};

export default VideoPlayer;
