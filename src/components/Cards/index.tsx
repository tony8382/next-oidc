
export type Props = {
    imageSrc?: string;
    title?: string;
    description?: string
}
const Card = (props: Props) => {
    const { imageSrc, title, description } = props
    return (
        <>
            {title ?
                <div className="max-w-xs rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">                    <img
                    src={imageSrc}
                    className="rounded-t-lg"
                    alt="..." />
                    <div className="p-6">
                        <h5
                            className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            {title}
                        </h5>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            {description}
                        </p>
                    </div>
                </div>
                :
                <div
                    className="max-w-xs rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                    aria-hidden="true">
                    <img
                        src="https://tecdn.b-cdn.net/img/new/standard/nature/182.webp"
                        className="rounded-t-lg"
                        alt={title} />
                    <div className="p-6">
                        <h5
                            className="mb-2 animate-pulse text-xl font-medium text-neutral-900 dark:text-white">
                            <span
                                className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                        </h5>
                        <p
                            className="mb-4 animate-pulse text-base text-neutral-700 dark:text-white">
                            <span
                                className="inline-block min-h-[1em] w-7/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                            <span
                                className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                            <span
                                className="inline-block min-h-[1em] w-4/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                            <span
                                className="inline-block min-h-[1em] w-6/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                            <span
                                className="inline-block min-h-[1em] w-8/12 flex-auto cursor-wait bg-current align-middle opacity-50"></span>
                        </p>
                    </div>
                </div>
            }
        </>
    );
};

export { Card };

