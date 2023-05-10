import React from "react";
import { Link } from "react-router-dom";
import {
    DocumentPlusIcon,
    ClipboardDocumentIcon,
    AcademicCapIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import FeatureCard from "../components/UI/FeatureCard";

const LandingPage = () => {
    return (
        <>
            <section className="lg:p-5 mx-auto text-center min-h-[60vh] xl:min-h-[80vh]">
                <h1 className="text-3xl md:text-5xl lg:text-6xl mx-auto max-w-3xl pt-24 xl:pt-36 pb-8 lg:pb-12 font-extrabold text-brown">
                    Train your <span className="text-yellow">brain</span> and
                    level up your knowledge!
                </h1>
                <p className="mx-auto px-2 max-w-3xl md:text-lg lg:text-xl mb-12 lg:mb-16">
                    Brain Gain is a study tool that allows you to create
                    flashcards and take quizzes to improve your memory and
                    knowledge retention.
                </p>
                <div className="space-x-4 lg:space-x-8">
                    <a className="btn md:py-4 text-white" href="#features">
                        Learn More
                    </a>
                    <Link
                        className="btn md:py-4 bg-yellow hover:bg-yellow-darker text-white"
                        to="/login"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            <section
                className="mx-auto max-w-5xl m-10 md:pb-10 lg:pb-24 pt-10"
                id="features"
            >
                <h2 className="text-2xl md:text-3xl lg:text-5xl text-brown font-black text-center mb-4 lg:mb-8">
                    Study <span className="text-yellow">smarter</span> with
                    Brain Gain
                </h2>
                <p className="mx-auto px-2 max-w-3xl md:text-lg lg:text-xl mb-12 lg:mb-16 text-center">
                    Discover how Brain Gain's features, designed to enhance your
                    learning experience, can help you achieve your study goals.
                </p>
                <div className="grid md:grid-cols-2 gap-4 lg:gap-8 ">
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
