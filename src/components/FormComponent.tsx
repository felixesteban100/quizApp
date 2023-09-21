import { useInView } from 'react-intersection-observer';

type FormComponentProps = {
    children: JSX.Element[]
    label: string;
    functionWithhandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

function FormComponent({
    children,
    label,
    functionWithhandleSubmit
}: FormComponentProps
) {
    const { ref: sectionRef, inView: sectionInView } = useInView({
        threshold: 0.2,
    });

    return (
        <div ref={sectionRef} className={`min-h-[90vh] flex flex-col justify-center items-center mt-5 ${sectionInView ? "animate-scaleInCenter" : "invisible"}`}>
            <div className="text-4xl mb-5">{label}</div>
            <form className="w-[90%] max-w-[50rem] form-control flex flex-col justify-center align-middle gap-5 mb-5" onSubmit={functionWithhandleSubmit}>
                {children}
            </form>
        </div>
    )
}

export default FormComponent