import { Redirect } from 'expo-router';
import { useAppStore } from '../src/state/store';

export default function Index() {
  const onboarded = useAppStore((s) => s.onboarded);
  return <Redirect href={onboarded ? '/(tabs)' : '/(onboarding)'} />;
}
