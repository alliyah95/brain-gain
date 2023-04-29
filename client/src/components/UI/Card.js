import { Link } from "react-router-dom";

const Card = ({
    path,
    title,
    description,
    hasTag,
    tagType,
    tagContent,
    noDescPrompt,
}) => {
    let tagClass = "tag bg-yellow text-white";
    if (tagType === "no-bg") {
        tagClass = "text-muted-brown text-xs";
    }

    return (
        <div className="preview-card">
            {hasTag && <p className={tagClass}>{tagContent}</p>}
            <p>
                {" "}
                <Link
                    to={path}
                    className="font-semibold inline-block hover:underline"
                >
                    {title}
                </Link>
            </p>

            {description && <p>{description}</p>}
            {!description && !noDescPrompt && (
                <p className="text-opacity-50">No description provided</p>
            )}
        </div>
    );
};

export default Card;
