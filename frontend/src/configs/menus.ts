import iconChartNoAxesColumn from "../assets/icon-chartNoAxesColumn.svg";
import iconDumbbell from "../assets/icon-Dumbbell.svg"
import iconCalendar from "../assets/icon-Calendar.svg"
import iconTrendingUp from "../assets/icon-TrendingUp.svg"
import iconTrophy from "../assets/icon-Trophy.svg"
import iconUser from "../assets/icon-User.svg"

export const menu = {
  teste: [
    {
      title: "Dashboard",
      path: "/",
      icon: iconChartNoAxesColumn,
    },
    {
      title: "Treinos",
      path: "/Treinos",
      icon: iconDumbbell,
    },
    {
      title: "Agenda",
      path: "/Agenda",
      icon: iconCalendar,
    },
    {
      title: "Progresso",
      path: "/Progresso",
      icon: iconTrendingUp,
    },
    {
      title: "Conquistas",
      path: "/Conquistas",
      icon: iconTrophy,
    },
    {
      title: "Perfil",
      path: "/Perfil",
      icon: iconUser,
    },
  ],
};
