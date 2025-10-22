import Link from 'next/link';

const Navigasi = (props) => {
    const { to, title, className } = props;
    return (
        <Link href={to} className={`px-4 py-2 rounded-md shadow-md transition ${className}`}>{title}</Link>
    );
};

export default Navigasi;