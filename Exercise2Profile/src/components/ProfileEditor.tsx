import React, { useSyncExternalStore, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper, Container, Avatar } from '@mui/material';
import { useFormik } from 'formik';
import { profileStore } from '../store/profileStore';
import { profileSchema, type ProfileData } from '../schemas/profileSchema';

export const ProfileEditor: React.FC = () => {
  // Conectar al store externo nativo
  const storeData = useSyncExternalStore(
    profileStore.subscribe,
    profileStore.getSnapshot
  );

  // Referencias y estados para el DOM sincrónico (Avatar)
  const avatarWrapperRef = useRef<HTMLDivElement>(null);
  const [avatarGlow, setAvatarGlow] = useState({ padding: 4, glowIntensity: 0 });

  // Configuración Formik
  const formik = useFormik<ProfileData>({
    initialValues: storeData,
    enableReinitialize: true,
    validate: (values) => {
      const result = profileSchema.safeParse(values);
      if (result.success) return {};
      
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        errors[path] = issue.message;
      });
      return errors;
    },
    onSubmit: () => {
      // Auto-save handles changes, onSubmit is kept just in case but not strictly needed
    },
  });

  // Persistencia en tiempo real
  useEffect(() => {
    profileStore.setProfile(formik.values);
  }, [formik.values]);

  // Ajuste sincrónico del DOM con useLayoutEffect
  useLayoutEffect(() => {
    if (avatarWrapperRef.current) {
      const bioTextLength = formik.values.bio?.length || 0;
      // Calculamos dinámicamente un progreso basado en 200 caracteres máximos
      const progress = Math.min(bioTextLength / 200, 1);
      
      // Ajuste de brillo (boxShadow opacity) y padding
      setAvatarGlow({
        padding: 4 + progress * 6, // padding crece sutilmente
        glowIntensity: progress * 0.8 // intensidad del glow púrpura crece
      });
    }
  }, [formik.values.bio]);

  // Derivar iniciales para el avatar
  const initials = formik.values.name
    ? formik.values.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 5,
          pb: 6,
          px: { xs: 3, sm: 5 }
        }}
      >
        {/* Contenedor dinámico del Avatar */}
        <Box 
          ref={avatarWrapperRef}
          sx={{
            p: `${avatarGlow.padding}px`,
            borderRadius: '50%',
            background: `rgba(179, 136, 255, ${avatarGlow.glowIntensity * 0.2})`,
            boxShadow: `0 0 ${10 + avatarGlow.glowIntensity * 40}px rgba(179, 136, 255, ${avatarGlow.glowIntensity})`,
            transition: 'all 0.1s ease-out',
            mb: 3
          }}
          data-testid="avatar-wrapper"
        >
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main', 
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#0B0D17'
            }}
          >
            {initials}
          </Avatar>
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
          Profile Editor
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4, textAlign: 'center' }}>
          Your changes are auto-saved in real-time.
        </Typography>

        <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            id="name"
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            id="bio"
            name="bio"
            label="Biography"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bio && Boolean(formik.errors.bio)}
            helperText={formik.touched.bio && formik.errors.bio}
          />
        </Box>
      </Paper>
    </Container>
  );
};
