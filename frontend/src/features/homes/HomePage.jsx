import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetHomesByUserQuery } from '../../redux/api/homesApiSlice';
import HomeCard from '../../components/HomeCard';
import UserDropdown from '../../components/UserDropdown';
import Spinner from '../../components/Spinner';

const HomesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const selectedUser = useSelector((state) => state.users.selectedUser);
    const { data: homes = [], isLoading, isError } = useGetHomesByUserQuery({ userId: selectedUser, page: currentPage }, { skip: !selectedUser });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (isLoading) return <Spinner />;
    if (isError) return <p>Error loading homes.</p>;

    const filteredHomes = homes

    return (
        <div className="homes-page">
            <UserDropdown />

            <div className="homes-list">
                {filteredHomes.length > 0 ? (
                    filteredHomes.map((home) => (
                        <HomeCard
                            key={home.home_id}
                            home={home}
                        //   onEdit={() => dispatch(openModal(home.id))}
                        />
                    ))
                ) : (
                    <p>No homes available for this user.</p>
                )}
            </div>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomesPage;
