import React from "react";
import { Link, useRouteLoaderData } from "react-router-dom";
import {
    DocumentPlusIcon,
    ClipboardDocumentIcon,
    AcademicCapIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import FeatureCard from "../components/UI/FeatureCard";

const LandingPage = () => {
    const token = useRouteLoaderData("root");

    return (
        <>
            <section className="mx-auto text-center min-h-[65vh] lg:h-[80vh] pb-20 lg:pb-0 lg:p-5 fade-in">
                <div className="pt-24 xl:pt-28 mb-5 lg:mb-8">
                    <img
                        src="assets/landing.png"
                        className="h-36 mx-auto"
                        alt="Brain"
                    />
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl mx-auto max-w-3xl mb-4 lg:mb-8 font-black font-title text-brown">
                    Train your brain and level up your mind!
                </h1>
                <p className="mx-auto max-w-3xl md:text-lg lg:text-xl mb-8 px-2">
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
                        title="Create a quiz"
                        description="Easily create custom quizzes tailored to your
                            specific learning needs."
                        illustration={<DocumentPlusIcon />}
                    />
                    <FeatureCard
                        title="Take a quiz"
                        description="Test your knowledge and track your progress with our user-friendly quiz interface."
                        illustration={<ClipboardDocumentIcon />}
                    />
                    <FeatureCard
                        title="Flashcards"
                        description="Use our flashcards to study on-the-go and improve your memory retention."
                        illustration={<AcademicCapIcon />}
                    />
                    <FeatureCard
                        title="Study with others"
                        description="Share your quizzes and flashcards with friends and classmates to collaborate and study together."
                        illustration={<UserGroupIcon />}
                    />
                </div>
            </section>
        </>
    );
};

export default LandingPage;
