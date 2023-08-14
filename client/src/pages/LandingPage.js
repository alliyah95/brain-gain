import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import { FeatureCard } from "../components";

const LandingPage = () => {
    const token = useRouteLoaderData("root");

    return (
        <>
            <section className="mx-auto text-center min-h-[80vh] lg:p-5 flex flex-col justify-center items-center fade-in">
                <div className="mb-5 lg:mb-8">
                    <img
                        src="assets/landing.png"
                        className="h-36 mx-auto"
                        alt="Brain"
                    />
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl mx-auto max-w-3xl mb-4 lg:mb-8 font-black font-title text-brown">
                    Train your brain and level up your mind!
                </h1>
                <p className="mx-auto max-w-3xl md:text-lg lg:text-xl mb-8">
                    Brain Gain is a study tool that allows you to create
                    flashcards and take quizzes to improve your memory and
                    knowledge retention.
                </p>
                <div className="space-x-4 xl:space-x-6">
                    <a className="btn md:py-4 text-white" href="#features">
                        Learn More
                    </a>
                    <Link
                        className="btn md:py-4 bg-yellow hover:bg-yellow-darker text-white"
                        to={token ? "/home" : "/signup"}
                    >
                        {token ? "Go Home" : "Get Started"}
                    </Link>
                </div>
            </section>

            <section
                className="mx-auto max-w-5xl m-10 md:pb-10 lg:pb-24 pt-10 lg:pt-32 fade-in"
                id="features"
            >
                <h2 className="text-2xl md:text-3xl lg:text-5xl text-brown font-black font-title text-center mb-4 lg:mb-6">
                    Study <span className="text-yellow">smarter</span> with
                    Brain Gain
                </h2>
                <p className="mx-auto max-w-3xl md:text-lg lg:text-xl mb-12 lg:mb-12 text-center">
                    Discover how Brain Gain's features, designed to enhance your
                    learning experience, can help you achieve your study goals.
                </p>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 px-2 mx-auto">
                    <FeatureCard
                        title="Create quizzes"
                        description="Easily create custom quizzes tailored to your
                            specific learning needs."
                        src="assets/create-quiz.png"
                        alt="document"
                    />
                    <FeatureCard
                        title="Test your brain"
                        description="Test your knowledge and track your progress with our user-friendly quiz interface."
                        src="assets/take-quiz.png"
                        alt="quiz"
                    />
                    <FeatureCard
                        title="Boost your memory"
                        description="Use our flashcards to study on-the-go and improve your memory retention."
                        src="assets/flashcard.png"
                        alt="flashcards"
                    />
                    <FeatureCard
                        title="Study with others"
                        description="Share your quizzes and flashcards with friends and classmates to collaborate and study together."
                        src="assets/study-with-others.png"
                        alt="people"
                    />
                </div>
            </section>

            <section
                className="mx-auto max-w-5xl m-10 md:pb-16 lg:pb-24 pt-16 lg:pt-32 fade-in"
                id="features"
            >
                <h2 className="text-2xl md:text-3xl lg:text-5xl text-brown font-black font-title text-center mb-4 lg:mb-6">
                    Take a look: <span className="text-yellow">Brain Gain</span>{" "}
                    preview video!
                </h2>
                <p className="mx-auto max-w-3xl md:text-lg lg:text-xl mb-12 lg:mb-12 text-center">
                    Get a glimpse of the app's functionality and user experience
                    by watching this video.
                </p>
                <div className="px-2">
                    <iframe
                        className="w-full h-72 md:h-96 lg:h-[500px] rounded-md"
                        src="https://www.youtube.com/embed/G_jjX6Bs3eM"
                        title="YouTube video player"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
