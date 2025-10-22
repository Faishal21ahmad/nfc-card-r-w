const LayoutNav = (props) => {
    const { children } = props;
    return (
        <div className="fixed bottom-6 right-6 md:top-5 md:left-5 md:bottom-auto md:right-auto flex gap-3 z-50">
            {children}
        </div>
    );
};

export default LayoutNav;