import { Box, CircularProgress, Typography, Fade } from "@mui/material";

const Loading = ({ message = "Loading...", show = true }) => {
  return (
    <Fade in={show} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          bgcolor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "#fff",
          zIndex: 1300,
        }}
      >
        <CircularProgress
          size={70}
          thickness={4}
          sx={{
            color: "white",
            mb: 3,
            animation: "spin 1.5s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
        <Typography variant="h6" sx={{ letterSpacing: 1 }}>
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default Loading;