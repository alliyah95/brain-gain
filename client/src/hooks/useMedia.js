import { useMediaQuery } from "react-responsive";

const useMedia = () => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 959.99px)" });
    const isLargeScreen = useMediaQuery({
        query: "(min-width: 960px) and (max-width: 1139.99px)",
    });
    const isExtraLargeScreen = useMediaQuery({ query: "(min-width: 1140px)" });

    return { isSmallScreen, isLargeScreen, isExtraLargeScreen };
};

export default useMedia;
