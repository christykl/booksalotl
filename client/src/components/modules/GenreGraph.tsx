import React from "react";
import { Doughnut } from "react-chartjs-2";
import "../../utilities.css";
import "../pages/Profile.css";

const GenreGraph = ({ bookData }) => {
type GenreCount = {
    [key: string]: number;
    };
    
    const calculateGenreCounts = (): GenreCount => {
    const genreCounts: GenreCount = {};
    bookData.forEach((book) => {
        if (book.genre in genreCounts) {
        genreCounts[book.genre]++;
        } else {
        genreCounts[book.genre] = 1;
        }
    });
    return genreCounts;
    };
    
    const genreColors = [
    getComputedStyle(document.documentElement).getPropertyValue("--primary"),
    getComputedStyle(document.documentElement).getPropertyValue("--green"),
    getComputedStyle(document.documentElement).getPropertyValue("--blue"),
    getComputedStyle(document.documentElement).getPropertyValue("--lavender"),
    getComputedStyle(document.documentElement).getPropertyValue("--beige"),
    ];
    
    const getTopGenres = (): [string, number][] => {
    const genreCounts = calculateGenreCounts();
    return Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    };
    
    const topGenres = getTopGenres();
    const topGenreData = {
    labels: topGenres.map((genre) => genre[0]),
    datasets: [
        {
        data: topGenres.map((genre) => genre[1]),
        backgroundColor: genreColors.slice(0, topGenres.length),
        hoverOffset: 4,
        },
    ],
    };  

  return (
    <Doughnut className="Profile-chartSubContainer" data={topGenreData} />
  )
}

export default GenreGraph;