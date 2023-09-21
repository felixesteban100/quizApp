import { SignIn } from '@clerk/clerk-react';
import { useInView } from 'react-intersection-observer';
import { CLERK_THEME } from '../constants';

type Props = {}

function SignInOwn({ }: Props) {
    const { ref: sectionRefSignIn, inView: sectionInViewSignIn } = useInView({
        threshold: 0.2,
      });
    return (
        <div
            ref={sectionRefSignIn}
            className={
                `text-base-content flex justify-center items-center h-[90vh] mx-auto w-[100vw]
                    ${sectionInViewSignIn ? "animate-scaleInCenter" : "invisible"}`
            }
        >
            <SignIn
                routing="path"
                path="/sign-in"
                appearance={CLERK_THEME}
            />
        </div>
    )
}

export default SignInOwn